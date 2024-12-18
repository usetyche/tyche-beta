// tyche-backend/models/User.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
	fullname: {
		type: String,
		trim: true,
		maxlength: [50, "Full name can not exceed 50 characters"],
	},
	email: {
		type: String,
		required: [true, "Please add an email"],
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please add a valid email",
		],
	},
	password: {
		type: String,
		minlength: 6,
		select: false,
		// Make password optional for Google users
	},
	googleId: {
		type: String,
		unique: true,
		sparse: true, // Allows multiple docs with null googleId
	},
	wallets: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Wallet",
		},
	],
	preferredCurrency: {
		type: String,
		enum: ["USD", "EUR", "TRY", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK"],
		default: "USD",
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Encrypt password using bcrypt before saving
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT, 10));
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
	// Generate token
	const resetToken = crypto.randomBytes(20).toString("hex");

	// Hash token and set to resetPasswordToken field
	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	// Set expire
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model("User", UserSchema);

export default User;
