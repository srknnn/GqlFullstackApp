
import Axios from "axios";
export class LoginManager{

    public static CormindCookie?:string[];

    public static async loginCormind() : Promise<void>{

            const testData = await Axios.post(
                "https://dev.cormind.com/panel/login",
                new URLSearchParams({
                  username: "task",
                  password: "1234",
                  react: "true",
                }),
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
              );
              this.CormindCookie = testData.headers["set-cookie"];
        }  
}