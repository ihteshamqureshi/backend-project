
import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({


    id: String,

    name: String,

    thumbnailimage: String,

    description: String,

    category: String,

    href: String,

    screenshots: [String],



    Features: [
        {
            title: String,
            caption: String,
            image: String,
        },
    ],




});




export default mongoose.model("Project", projectSchema);