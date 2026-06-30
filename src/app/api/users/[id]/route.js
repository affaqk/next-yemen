import Connection from "@/app/db/conn";
import User from "@/app/models/userModel";

export const GET = async (req, { params }) => {
    try {
        await Connection();
        const { id } = await params
        const user = await User.findById(id)
        if(!user){
            return Response.json({
                success : false,
                message : "User not found"
            },{
                status : 401
            })
        }

        return Response.json({
            success : true,
            user
        },{
            status : 200
        })

    } catch (error) {
        return Response.json({
            success : false,
            error
        })
    }
}