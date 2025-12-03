const colors=require('colors');
const langs=require('langs');
const franc=require('franc');
const input=process.argv[2];

const langCode=franc(input);
if(langCode==='und'){
    console.log("Sorry,couldnt figure out the language")
}
else{
    const language=langs.where("3",langCode);
    console.log(`Our best guess is:${language.name}`.green);
}

