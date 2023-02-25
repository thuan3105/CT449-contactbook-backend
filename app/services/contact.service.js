const { ObjectId } = require('mongodb');

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection('contacts');
    }

    extactContactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };

        //remove undefined fields
        Object.keys(contact).forEach(
            (key) => (contact[key] === undefined) && delete contact[key]
        );
        return contact;
    }

    async create(payload) {
        const contact = this.extactContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite === true } },
            { returnDocument: 'after', upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({ name: { $regex: new RegExp(name), $options: 'i' } });
    }

    async findById(id) {
        try {
            const objectId = ObjectId.isValid(id) ? new ObjectId(id) : null;
            if (!objectId) {
                return null;
            }
            const result = await this.Contact.findOne({ _id: objectId });
            return result;
        } catch (error) {
            console.error(`An error occurred while finding contact with id ${id}: ${error.message}`);
            throw error;
        }
    }
      async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        }
        const update = this.extactContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result.value;
    }
    async delete(id) {
        const result = await this.Contact.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        })
        return result.value;
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }


    async deleteAll() {
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = ContactService;