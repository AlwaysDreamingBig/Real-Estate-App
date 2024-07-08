import mongoose from "mongoose";


{/** timestamps: true is because we will need the time of creation and updating  */}
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKUAAACUCAMAAADF0xngAAAAMFBMVEXk5ueutLfo6uu9w8WrsbWor7Kzubza3d7h4+S6v8LR1NbM0NLJzc/V2NrFycu3vL91wuXOAAAD4klEQVR4nO2cy5akIAxAJSDgC///bwe0qqdqylaSaLDmcBe96c09wRAeoZqmUqlUKpVKpVKpVCqVyi4ApQ32iX5u6iPONfdUBe8GrdqIMemv1f3dVAFcmFVr1AumVV3wd/J085vgX1PT+dJuD8DpdtNx9QzuBvEECGo7kE9PNRbXBGd3HRfPuXA4YThSXMM5ldSEMUcyMRTUDIej/aQtpgn5knHUh0KSI0IyavYlognD77Pk9qAXyHTwqEgmbIE6ZLGSymhxyYCWjGMu/Wk6gmSMpqwlHNfFTcsgqQkTMr+fWCdo2cw0SWVGOUeYiJIRwdkIUxrfEaznnh5KpaQsoSfmTsJMUpbU3FmQmoyAEUqlZpn8gYmcOwmhKRO1+P3EyOyBQHMkpSZ2z0oeqfWbx68s35hFLGmLthdELBlFfMFISDInoljKv8NSYlqvlmda8iRlvsvvyPHGMWd1K2LJrJCqk7HsWJImiFiC5q3cZA4y84+ptxE6Y3ffsFZvgGUpkzzcD1Psjspx9uNi51mc1boVO4Fh7CIlj4PpRVJm07NC3uxKnl/GL5N6Fix6mUL8MqUvKUhpbuQSfAUGSjBFz/4XTXwBkk2dB9grHyNVwd9An8SUkMRueWUvpF40MbcAplgfDGZrXrJZZzJZo25s0Y6inKan1PZUuNsNmoMGsnu0kMWP0+4mUVu6f2wFYPg1nMbYvrTfE/DjvJVGxnTDnfpZwU/BfPSyhrv13KaB94Oe7bKis3bWg79pszVEU5fw0fCeisnxndJCr0QbHyM4jaPu4nibRBzyToexT1Et32Wfhngag55jrrT/ZLlJfevKdiGkxvVypuD7YBed3dIT/2u7sUTneophmNs2e4UZ5yXpxwAAk96cxvdFjdW9VEhjsgSFVnyIKtVJ9MBA03f547xFa4eLlx8A2wUbGVF75SuQWAKP1pLZouGivVoc6/2FJE5TXfIKBH57HUP3PH0JD37ndQzZ05579QM9rcP2kHDePB8DeYmiWrbAZ0m6szJ7i/aca0nor1NMnNKrxbzBzdHk9wpfkdsfsM9nuqsjucLTvGgC+oDzqsYLRTJBnuBBUJLcbg8SicPVpN3oMKBcYbAbxdBQntWwXiHQwN9SXl9yNsDe+F5dvLfBlnRuLxtVE7UNhlF2EvqxRF1N895zcDQRCcR8KcEB0ZzJ7e5ngAimdNV5tcz/UYkSc+WPZu52jdPGxrfMrJPI1+una2ZalsudxTJv2Y5/vn4uWcdH7BcIXHSWJeX9+plkXfkzH7/xyTo6YjbNC1lmdWJciMl6MOl1YfLuWj7uZqXJkaxUKv8TfwAtRzGAfxONDgAAAABJRU5ErkJggg==",
    },
    bio: {
        type: String,
        default: "",
    },
    age: {
        type: Number,
        default: null,
    },
    city: {
        type: String,
        default: "",
    },
    state: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        default: "",
    },
    postCode: {
        type: Number,
        default: null,
    },
    phoneNumber: {
        type: Number,
        default: null,
    },
    agency: {
        type: String,
        default: "",
    },
    agencyLicence: {
        type: String,
        default: "",
    },
    taxNumber: {
        type: String,
        default: "",
    },
    serviceArea: {
        type: String,
        default: "",
    },
    totalListing: {
        type: Number,
        default: 0,
    },
    propertiesSold: {
        type: Number,
        default: 0,
    },
    propertiesRent: {
        type: Number,
        default: 0,
    },
    settings: {
        emailNotifications: { type: Boolean, default: false },
        messageNotifications: { type: Boolean, default: false },
        publicProfile: { type: Boolean, default: false },
        dataSharing: { type: Boolean, default: false },
        language: { type: String, default: 'en' },
        currency: { type: String, default: 'usd' }
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;