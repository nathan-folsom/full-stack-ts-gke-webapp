import {Injectable} from "@angular/core";
import {Subscription, Observable} from "rxjs";

@Injectable()
export class SubscriptionService {
  private subscription = new Subscription()

  add = (input: Observable<any>) => {
    this.subscription.add(input.subscribe());
  }

  unsubscribe = () => {
    console.log('unsub');
    this.subscription.unsubscribe();
  };
}
