const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: [true, "Error: name is required"],
        },
        last_name: {
            type: String,
            required: [true, "Error: last name is required"],
            },
        family_members: {
            type: Number,
            required: [true, "Error: number is required"],
            },
        email: {
        type: String,
        unique: true,
        required: [true, "Error: email is required"],
        validate: {
            validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email",
        },
        },
        password: {
        type: String,
        required: [true, "Error: password is required"],
        }
    },
    {
        timestamps: true,
    }
    );


UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next){
    if(this.confirmPassword !== this.password ){
        this.invalidate("confirmPassword", "Error: passwords didn't match. Please try again.");
    }
    next();
})

UserSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
        this.password = hashedPassword;
        next();
        })
})

UserSchema.plugin(uniqueValidator,  { message: 'Error: User already registered.' });

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;