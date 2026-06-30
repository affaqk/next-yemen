import Connection from "@/app/db/conn";
import User from "@/app/models/userModel";

export const POST = async (req) => {
    try {
        await Connection();
        const body = await req.json();
        const user = await User.create(body);
        if(!user){
            return Response.json({
                success : false,
                message : "User not created"
            },{
                status : 401
            })
        }

        return Response.json({
            success : true,
            message : "User created successfully",
            user
        },{
            status : 200
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