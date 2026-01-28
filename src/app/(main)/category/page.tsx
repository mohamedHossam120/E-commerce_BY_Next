import { getServerSession } from "next-auth/next";
import { NextOptions } from "src/app/api/auth/[...nextauth]/route";

export default async function Page() {
    const data = await getServerSession(NextOptions);

    console.log(data);   
    console.log(data);  

    return (
        <>
            <h1>Page</h1>
        </>
    );
}
