import sharp from 'sharp';
import fs from 'fs';
async function ProcessImage(
  fullname: string,
  width: number,
  height: number
): Promise<string> {
  const Newfullname = `filename=${
    fullname.split('.')[0]
  }&width=${width}&height=${height}.${fullname.split('.').pop()}`;

  try {
    const file = fs.readFileSync(
      process.cwd() + '/assets/thumbnail/' + Newfullname
    );
    if (file) {
      return Newfullname;
    }
  } catch (error) {
    await sharp(`./assets/full/${fullname}`)
      .resize(+width, +height)
      .toFile('./assets/thumbnail/' + Newfullname) //*
        .then(() => {
            console.log('Image Convert Successful!!');
            return Newfullname;
        })
        //*/
  }
  return Newfullname;
}

export default ProcessImage;
