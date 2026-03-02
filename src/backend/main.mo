import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

actor {
  type Message = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  module Message {
    public func compare(message1 : Message, message2 : Message) : Order.Order {
      Int.compare(message2.timestamp, message1.timestamp);
    };
  };

  let messages = Map.empty<Principal, Message>();

  public shared ({ caller }) func submitMessage(name : Text, email : Text, messageText : Text) : async () {
    switch (messages.get(caller)) {
      case (?_) { Runtime.trap("You have already submitted a message") };
      case (null) {
        let message : Message = {
          name;
          email;
          message = messageText;
          timestamp = Time.now();
        };
        messages.add(caller, message);
      };
    };
  };

  public query ({ caller }) func getAllMessages() : async [Message] {
    if (caller.toText() != "bkyz2-fmaaa-aaaaa-qaaaq-cai") {
      Runtime.trap("Only the admin can see all messages");
    };
    messages.values().toArray().sort();
  };
};
