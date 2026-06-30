import Connection from "@/app/db/conn";
import User from "@/app/models/userModel";

export const POST = async (req) => {
    try {
        await Connection();
        const { email, password } = await req.json();
        const user = await User.findOne({email});
        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 401
            })
        }

        if (password !== user.password) {
            return Response.json({
                success: "Invalid credentials"
            }, {
                status: 401
            })
        }

        return Response.json({
            success: true,
            message: "User loggedin successfully",
            user
        }, {
            status: 200
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: error.message
        }, {
            status: 500
        })
    }
}