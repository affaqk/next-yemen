import Connection from "@/app/db/conn";
import Product from "@/app/models/productModel";

// createProductController

export const POST = async (req) => {
    try {
        await Connection();
        const body = await req.json();
        const product = await Product.create(body);
        return Response.json({
            success : true,
            message : "Product created successfully",
            product
        },{
            status : 201
        })
    } catch (error) {
        return Response.json({
            success : false,
            message : error.message
        },{
            status : 500
        })
    }
}

export const GET = async (req) => {
    try {
        await Connection();
        const products = await Product.find();
        if(!products){
            return Response.json({
                success : false,
                message : "products not found"
            },{
                statusCode : 401
            })
        }

        return Response.json({
            success : true,
            products
        },{
            statusCode : 200
        })
    } catch (error) {
        return Response.json({
            success : false,
            error
        },{
            statusCode : 500
        })
    }
}