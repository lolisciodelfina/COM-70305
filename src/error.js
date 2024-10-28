export const ErrorProcesa=(res,error)=>{
    console.log (error);
    return res.status(500).json({
        error: "Error inesperaado en el servidor",
        detalle:`${error.message}`
    })
}