//--- Video tutorial base para entender Express.js
// https://www.youtube.com/watch?v=dkic3MU3858&list=WL&index=2&t=860s&ab_channel=UskoKruM2010

import app from "./app";

const main = () =>
{
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
};

main();
