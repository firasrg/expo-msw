import { rest } from 'msw'
import { API_BASE_URL } from "./default";
import { shuffleList } from "./utils";
import fakeDataItems from "./fakeData";

/**
 * mock api handler
 */
const handlers = [

  rest.get(
      `${API_BASE_URL}`, (req, res, ctx) => {

        const paramTake = req.url.searchParams.get("take");

        // console.log("param received is : ", paramTake);
        
        const shuffledList: Array<any> = shuffleList(fakeDataItems as []);

        let finalList: Array<any> = shuffledList.slice(0, Number(paramTake));

        const responseBody = {
          results: finalList
        }

        // console.log("response is: ", responseBody);

        const response = ctx.json(responseBody);

        ctx.status(200);
        ctx.delay(300);

        return res(response)
      }
  )
]

export { handlers }
