import Connection from "@/app/db/conn";
import Product from "@/app/models/productModel";

export async function GET (req, { params }){
    try{
        await Connection();
        const { id } = await params
        const product = await Product.findById(id);
        if(!product){
            return Response.json({
                success : false,
                message : "Product not found"
            },{
                status : 400
            })
        }

        return Response.json({
            success : true,
            message : "Product found successfully",
            product
        })
    } catch(error){
        return Response.json({
            success : false,
            error
        })
    }
}

export async function PUT(req, {params}){
    try{
        await Connection();
        const { id } = await params;
        const body = await req.json()

        const product = await Product.findByIdAndUpdate(id, body, {
            runValidators : true,
            new : true
        })

        if(!product){
            return Response.json({
                success : false,
                message : "Product not found"
            },{
                status : 400
            })
        }

        return Response.json({
            success : true,
            message : "Product updated successfully",
            product
        })

    } catch(error){
        console.log(error)
        return Response.json({
            success : false,
            error
        })
    }
}

export async function DELETE (req, {params}){
    try{
        await Connection();
        const { id } = await params;
        const product = await Product.findByIdAndDelete(id)

        if(!product){
            return Response.json({
                success : false,
                message : "Product not found"
            },{
                status : 400
            })
        }

        return Response.json({
            success : true,
            message : "Product deleted successfully"
        })
    } catch (error){
        console.log(error)
        return Response.json({
            success : false,
            error
        })
    }
}