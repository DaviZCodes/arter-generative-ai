
import { internalMutation, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const uploadScribble = mutation(
    async ({db, scheduler}, {prompt, scribble} : { prompt: string, scribble: string }) => {
        //insert is same as a POST
        const scribblePostId = await db.insert("scribbles", {
            prompt, 
        });

        console.log("upload invoked", {scribblePostId});

        await scheduler.runAfter(0, internal.generateImage.generateImage, {
            scribbleId : scribblePostId,    
            prompt,
            scribble,
        })

        return scribblePostId;
    }
);

export const getScribble = query(({db}, {scribbleId} : { scribbleId: Id<string> | undefined }) => {
    // if there is no id, stop the function
    if (scribbleId === undefined) { return null; }
    if (!scribbleId) { return null; } 
    return db.get(scribbleId);
})

export const updateScribbleResult = internalMutation( 
    //updating the scribble to become the generated replicate image
    async ({db}, 
        {scribbleId, result} : {scribbleId : Id<string>, result: string}) => {
    
    console.log("update invoked");

    await db.patch(scribbleId, {
        result,
    });
});

export const getScribbles = query(
    async ({db}) => {

    //query is the sage as GET
    const scribbles = await db.query("scribbles").collect();
    return scribbles;
});