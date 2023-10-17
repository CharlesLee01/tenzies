export default function Dice(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }

  return (
    <div>
      <button
        className="die"
        style={styles}
        onClick={() => props.holdDie(props.id)}
      >
        {props.value}
      </button>
    </div>
  );
}
