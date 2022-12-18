import DiscriminatedUnion from "../src/Forms/DiscriminatedUnion";
import Or from "../src/Forms/Or";
import SuperRefine from "../src/Forms/SuperRefine";
import Transform from "../src/Forms/Transform";
import Union from "../src/Forms/Union";

export default function Forms() {
  return (
    <>
      <div>
        <h1>Union</h1>
        <Union />
      </div>
      <div>
        <h1>DiscriminatedUnion</h1>
        <DiscriminatedUnion />
      </div>
      <div>
        <h1>Or</h1>
        <Or />
      </div>
      <div>
        <h1>SuperRefine</h1>
        <SuperRefine />
      </div>
      <div>
        <h1>Transform</h1>
        <Transform />
      </div>
    </>
  );
}
