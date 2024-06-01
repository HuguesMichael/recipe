import express from "express";
import axios from "axios";
import bodyParse from "body-parser";


const app = express();
const port = 3000;
app.use(bodyParse.urlencoded({extended:true}));
// base URL for the API

const API_URL= "https://api.spoonacular.com/recipes/complexSearch";
// config configured to get de response use the API key

// use the static file like CSS
app.use(express.static("public"));

// connect to API with the paramaters and API key 
app.post("/recipes", async (req, res) => {
    const config= {
        params:{'cuisine':req.body.country,
                 'query': req.body.cuisne, },
        headers: {'x-api-key': '53ff4519617d4e0fa570ffdffe6ec5ed',},
      };
    try {
      const result = await axios.get(API_URL, config);
      console.log(result.data);
      res.render("index.ejs", { content: result.data.results });
    } catch (error) {
      //res.render("index.ejs", { content: JSON.stringify(error.response.data) });
      console.log(error.message);
    }
  });


  app.get("/", (req, res) => {
    res.render("index.ejs", { summary: "Waiting for data..." });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });