interface AllSports {
  sports: Sport[];
  setSelectedSport: (sport: Sport) => void;
  // id: string;
}

class Sport {
  name: string;

  img: string;

  stage: number;

  description: string[];

  constructor(name: string, img: string, stage: number, description: string[]) {
    this.name = name;
    this.img = img;
    this.stage = stage;
    this.description = description;
  }
}

const AllSports = (porps: AllSports) => {
  const { sports, setSelectedSport } = porps;
  const sportsArray: JSX.Element[] = [];

  sports.forEach((sport, index) => {
    sportsArray.push(
      <div
        className="sport Card_1"
        onClick={() => {
          setSelectedSport(sport);
        }}
        key={index}
      >
        <div className="showText">
          <div>{sport.name}</div>
          <img src={require('../../../static/arrow.png')} alt="arrow" />
        </div>
        <img src={sport.img} alt="nonthinking" className="sport_img" />
      </div>
    );
  });

  return <div id="AllSports">{[sportsArray]}</div>;
};

export { Sport };

export default AllSports;
