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

export const PUT = async (req, { params }) => {
    try {
        await Connection();
        const { id } = await params;
        const body = await req.json()
        const user = await User.findByIdAndUpdate(id, body ,{
            new : true,
            runValidators : true
        });

        if(!user){
            return Response.json({
                sucess : false,
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
        },{
            status : 500
        })
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await Connection();
        const { id } = await params;

        const user = await User.findByIdAndDelete(id);
        if(!user){
            return Response.json({
                sucess : false,
                message : "User not found"
            },{
                status : 401
            })
        }

        return Response.json({
            success : true,
            message : "User deleted successfully"
        },{
            status : 200
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            success : false,
            error
        },{
            status : 500
        })
    }
}