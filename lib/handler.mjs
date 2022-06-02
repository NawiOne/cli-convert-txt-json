// import fsExtra from 'fs-extra';
import fs from 'fs';
import path from 'path';

const handler = (dir, options) => {

    fs.readFile(dir, 'utf8', (err, data) => {

        if (err) {
            console.error('File or directory doesnt exist');
            return;
        }

        let { type, option } = options;
        type = type === 'text' ? 'txt' : type;

        let fileExt = path.extname(dir).split('.')[1];
        let destFileExt = option !== undefined ? path.extname(option).split('.')[1] : type;
        let fileName = path.basename(dir).split('.')[0];
        let newFileName = option !== undefined ? path.basename(option) : `${fileName}.${type}`;
        let newDir = option !== undefined ? path.dirname(option) : path.dirname(dir);


        if (type !== 'json' && type !== 'txt') {
            return console.log('convert type must be txt or json')
        } else if (fileExt === type) {
            return console.error('cannot convert into the same format')
        } else if (destFileExt === fileExt || (destFileExt !== 'json' && destFileExt !== 'txt')) {
            return console.error(`file extension in new directory must be ${type}`)
        } else if (type !== destFileExt) {
            return console.error(`file extension in new directory must be ${type}`)
        }
        console.log(type, destFileExt)

        try {
            let newData = type === 'json' ? JSON.parse(data.trim()) : JSON.stringify(data.trim());
            // console.log(newData)
            fs.writeFile(path.join(newDir, newFileName), newData, err => {
                if (err) {
                    return console.log(err)
                }
                console.log(`Convert file ${fileExt} to ${type} is done..`)
            })
        } catch (error) {
            console.log(`Error while convert ${fileExt} to ${type}`)
        }

    });

}

export default handler