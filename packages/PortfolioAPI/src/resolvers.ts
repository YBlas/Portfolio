import { ApolloError } from "apollo-server";
import { Collection, ObjectId } from "mongodb";


export const Query = {
    test: () => "Prueba de vuelta del API!",

    getPhotos: async (parent: any, args: { name: string, internalId: string }, context: { Photos: Collection }) => {
        if (!args.name && !args.internalId) {
            const photos = await context.Photos.find().toArray();
            return photos;
        }
        if (!args.name) {
            const photos = await context.Photos.find({ internalId: args.internalId }).toArray();
            return photos;
        }
        if (!args.internalId) {
            const photos = await context.Photos.find({ name: { $regex: args.name } }).toArray();
            return photos;
        }
        const photos = await context.Photos.find({ name: { $regex: args.name }, internalId: args.internalId }).toArray();
        return photos;
    },

    getPhoto: async (parent: any, args: { _id: string }, context: { Photos: Collection }) => {
        const photo = await context.Photos.findOne({ _id: new ObjectId(args._id) });
        if (!photo) {
            throw new ApolloError(`Photo with id ${args._id} not found`);
        }
        return photo;
    }
}

export const Mutation = {
    deletePhoto: async (parent: any, args: { _id: string }, context: { Photos: Collection }) => {
        const photo = await context.Photos.findOne({ _id: new ObjectId(args._id) });
        if (!photo) {
            throw new ApolloError(`Photo with id ${args._id} not found`);
        }
        await context.Photos.deleteOne({ _id: new ObjectId(args._id) });
        return photo;
    },

    uploadPhoto: async (parent: any, args: { url: string, name: string, internalId: string, date: string }, context: { Photos: Collection }) => {
        const date = new Date(args.date);
        if (date.toString() === "Invalid Date" || date.getFullYear() < 1900 || date.getFullYear() > 9999) {
            throw new ApolloError(`Date ${args.date} is not valid`);
        }
        const photoCheckRepeat = await context.Photos.findOne({ name: args.name, internalId: args.internalId });
        if (photoCheckRepeat) {
            throw new ApolloError(`Photo with name ${args.name} and internalId ${args.internalId} already exists`);
        }

        const photo = await context.Photos.insertOne({ url: args.url, name: args.name, internalId: args.internalId, date: args.date });
        return {
            _id: photo.insertedId,
            url: args.url,
            name: args.name,
            internalId: args.internalId,
            date: args.date
        }
    },

    uploadPhotos: async (parent: any, args: { photos: { _id: string, url: string, name: string, date: string }[], internalId: string }, context: { Photos: Collection }) => {
        const photosToInsert = args.photos;
        const photosToInsert2 = photosToInsert.filter((photo, index, self) =>
            index === self.findIndex((t) => (
                t.name === photo.name && t.date === photo.date
            ))
        );
        if (photosToInsert.length !== photosToInsert2.length) {
            throw new Error(`There are repeated photos`);
        }    
        const photosInserted = photosToInsert.map(async (photo) => {
            return {
                url: photo.url,
                name: photo.name,
                internalId: args.internalId,
                date: photo.date
            }
        });

        photosInserted.forEach(async (photo) => {
            const photoCheckRepeat = await context.Photos
                .findOne({ name: (await photo).name, internalId: (await photo).internalId });
            if (photoCheckRepeat) {
                throw new Error(`Photo with name ${(await photo).name} and internalId ${(await photo).internalId} already exists`);
            }

            const date = new Date((await photo).date);
            if (date.toString() === "Invalid Date" || date.getFullYear() < 1900 || date.getFullYear() > 9999) {
                throw new Error(`Date ${(await photo).date} is not valid`);
            }

            context.Photos.insertOne(await photo);
        }
        );
        
        return `All photos were inserted`;
    }
}
