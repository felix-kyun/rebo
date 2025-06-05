import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    type: {
        type: String,
        required: true,
        enum: ["group", "individual"],
    },
    pref: {
        type: Object,
        default: {},
    },
});

// override toJson
UserSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});

export const User = mongoose.model("User", UserSchema, "reboUsers");
