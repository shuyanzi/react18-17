export default function LongList(props: { liLen: number }) {
  const liLen = props.liLen;

  const creatData = () => {
    const elements: number[] = [];

    for (let i = 0; i < liLen * 3000; i++) {
      elements.push(Math.random());
    }

    return elements;
  };

  return (
    <ul>
      {
        creatData().map((v, i) => {
          return (<li key={i}>{v}</li>);
        })
      }
    </ul>
  );
}