import { ReturnDocument } from "mongodb";
import Blog from "../model/Blog";
import User from "../model/User";
import mongoose from "mongoose";

// get blogs
export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (err) {
        return console.log(err)
    }
    if (!blogs) {
        return res.status(404).json({message: "No Blogs Found"})
    }
    return res.status(200).json({blogs})
};

// post blog
export const addBlog = async (req, res, next) => {
    const {title, description, image, user} = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err)
    }
    if (!existingUser) {
        return res.status(400).json({message: "Unable To Find User By This Id"});
    }
    const blog = new Blog({
        title,
        description,
        image,
        user,
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    } catch (err) {
        return console.log(err);
        return res.status(500).json({message: err})
    }
    return res.status(200).json({blog});
};

// update blog by Id
export const updateBlog = async (req, res, next) => {
    const { title, image } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            image,
        });
    } catch (err) {
        return console.log(err)
    }
    if (!blog) {
        return res.status(500).json({message: "Unable to Update The Blog"});
    }
    return res.status(200).json({blog});
};

// get Blog By Id
export const getById = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({message: "Blog Not Found!"});
    }
    return res.status(200).json({blog});
};

// delete blog
export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(id).populate('user');
        if (blog.user && blog.user.blogs) {
            await blog.user.blogs.pull(blog._id);
            await blog.user.save();
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(200).json({ message: "Delete Successful" });
};

// get blog berdasarkan usernya
export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (err) {
        return console.log(err)
    }
    if (!userBlogs) {
        return res.status(404).json({message: "No Blog Found"});
    }
    return res.status(200).json({blogs:userBlogs});
};


