import { Skeleton } from "antd";

export const LoadingSkeleton = () => {
    return(
        <section className="m-10 gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="flex flex-col items-center gap-5 border p-5 m-2 rounded-2xl shadow-lg">
                <Skeleton.Image active style={{"height":"250px","width":"250px","borderRadius":"16px"}} /> 
                <Skeleton.Input active size="small" style={{"width":"250px"}} />
                <Skeleton.Input active size="small" style={{"width":"250px"}} />
                <Skeleton.Input active size="small" style={{"width":"150px"}} />
            </div>
            <div className="flex flex-col items-center gap-5 border p-5 m-2 rounded-2xl shadow-lg">
                <Skeleton.Image active style={{"height":"250px","width":"250px","borderRadius":"16px"}} /> 
                <Skeleton.Input active size="small" style={{"width":"250px"}} />
                <Skeleton.Input active size="small" style={{"width":"250px"}} />
                <Skeleton.Input active size="small" style={{"width":"150px"}} />
            </div>
            <div className="flex flex-col items-center gap-5 border p-5 m-2 rounded-2xl shadow-lg">
                <Skeleton.Image active style={{"height":"250px","width":"250px","borderRadius":"16px"}} /> 
                <Skeleton.Input active size="small" style={{"width":"250px"}} />
                <Skeleton.Input active size="small" style={{"width":"250px"}} />
                <Skeleton.Input active size="small" style={{"width":"150px"}} />
            </div>
            <div className="flex flex-col items-center gap-5 border p-5 m-2 rounded-2xl shadow-lg">
                <Skeleton.Image active style={{"height":"250px","width":"250px","borderRadius":"16px"}} /> 
                <Skeleton.Input active size="small" style={{"width":"250px"}} />
                <Skeleton.Input active size="small" style={{"width":"250px"}} />
                <Skeleton.Input active size="small" style={{"width":"150px"}} />
            </div>
        </section>
    )
}