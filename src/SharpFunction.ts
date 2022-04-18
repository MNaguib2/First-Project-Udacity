import sharp from "sharp";
async function ProcessImage(fullname: string, width: number, height: number): Promise<string> {
    const Newfullname: string = `filename=${fullname.split('.')[0]}&width=${width}&height=${height}.${fullname.split('.').pop()}`;
    await sharp(`./assets/full/${fullname}`)
        .resize(+width, +height)
        .toFile('./assets/thumbnail/' + Newfullname).then(result => {
            //console.log('Image Convert Successful!!');
        }).catch(error => {
            console.log('Occurred Error!' , error)
        });
    return Newfullname;
}

export default ProcessImage;