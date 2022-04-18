import { Request, Response } from "express";
import { ApolloClientManager } from "../managers/apolloClientManager";

export class Controller {
  public async getGQLMachines(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const results = await ApolloClientManager.executeGQLQuery(`
    query Machines {
      entities(model: Machine)
    }
   `);
    let machines = results?.data.entities;
    return res.status(200).json(machines);
  }

  public async getGQLMachine(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    let id: number = parseInt(req.params.id);
    const results = await ApolloClientManager.executeGQLQuery(`
        query MachineStats{
            machineStats(id:${id}) {
              id
              averageCycle
              idealCycle
              status
              prodAmount
              operator {
                id
                user {
                  id
                  username
                  first_name
                  last_name
                }
              }
              shift {
                id
                start
                end
              }
              cycle
              currentProdPlan {
                id
                current_produced
                goods {
                  id
                  code
                  amount
                  current_produced
                  product {
                    code
                    name
                  }
                }
              }
              defectAmount
              workDuration
              failureDuration
              availability
              performance
              quality
              oee
            }
          }
       `);
    let machine = results?.data;
    return res.status(200).json(machine);
  }
}
