import fs from 'fs'

/** Target file */
const target = "vendor/inertiajs/inertia-laravel/src/Response.php";
const toBeReplaced = "'url' => $request->getBaseUrl().$request->getRequestUri(),";
const replacing = "'url' => $request->getRequestUri(),";


/** Entry point  */
function main() {
    // reads response php
    fs.readFile(target, function(err, data) {
        // handles error
        if(err) {
            console.error(`Gagal update "${target}"; file tidak ditemukan!`)
            return;
        }
        
        // reads as string
        const dataString = data.toString();

        // ensure toBeReplaced exists in dataString
        if(!dataString.includes(toBeReplaced)) {
            console.log("Skip update; string tidak ditermukan!");
            return;
        }

        // creates new data
        let newDataString = dataString;

        // replaces
        newDataString = newDataString.replace(toBeReplaced, replacing);

        // writes
        fs.writeFile(target, newDataString, (err) => {
            // handles error
            if(err) {
                console.error(`Gagal update ${target}; tidak bisa meng-write; ${error}`);
            }
            else {
                console.log("Berhasil update!");
            }
        })

    });
}

// executes main
main();