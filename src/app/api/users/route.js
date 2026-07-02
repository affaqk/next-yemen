import Connection from "@/app/db/conn";
import User from "@/app/models/userModel";

export const GET = async (req) => {
    try {
        await Connection();
        const users = await User.find();
        if (!users) {
            return Response.json({
                success: false,
                message: "Users not found"
            }, {
                status: 400
            })
        }
        return Response.json({
            success: true,
            users
        }, {
            status: 200
        })
    } catch (error) {
        return Response.json({
            success: false,
            error
        }, {
            status: 500
        })
    }
}