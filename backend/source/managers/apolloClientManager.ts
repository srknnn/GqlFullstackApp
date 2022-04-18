import fetch from "cross-fetch";
import {
  ApolloClient,
  gql,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import {LoginManager} from "./loginManager"

export class ApolloClientManager {
  private static uri: string;
  private static cache: InMemoryCache;
  private static credentials: string;
  private static headers: { Cookie: any };
  private static link: HttpLink;
  private static client: ApolloClient<Object> | undefined;

  public static async initApolloClient() {
    if(!LoginManager.CormindCookie){
         await LoginManager.loginCormind();
    }  
    this.uri = "https://dev.cormind.com/panel/api/graphql";
    this.cache = this.cache || new InMemoryCache();
    this.credentials = "include";
    this.headers = { Cookie: LoginManager.CormindCookie };
    this.link = new HttpLink({
      fetch,
      uri: this.uri,
      headers: this.headers,
    });

    this.createClient();
  }

  private static createClient(): void {
    this.client =
      this.client ||
      new ApolloClient({
        uri: this.uri,
        cache: this.cache,
        credentials: this.credentials,
        link: this.link,
      });
  }

  public static async executeGQLQuery(
    query: string
  ): Promise<Record<string, any> | undefined> {
    await this.initApolloClient();
    const results = await this.client?.query({
      query: gql`
        ${query}
      `,
    });
    return results;
  }
}
