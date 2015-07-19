import chai from "chai";
import Rx from "rx";

var expect = chai.expect;

export function expectMessagesToEqual( messages, expected ) {
    expect(messages).to.have.length(expected.length);
    for( var i = 0, length = messages.length; i < length; ++i )
    {
        expectMessageToEqual(messages[i], expected[i]);
    }
}

export function expectMessageToEqual( actual, expected ) {
    expect(actual).to.satisfy(value => {
        return Rx.internals.isEqual(value, expected);
    }, "expected '" + actual.toString() + "' to equal '" + expected.toString() + "'");
}
