import classNames from 'classnames/bind';
import Card from 'react-bootstrap/Card';
import styles from './About.module.scss';

const cx = classNames.bind(styles);

const About = () => {
  return (
    <div className={cx('wrapper')}>
      <Card className={cx('card')}>
        <Card.Header as="h1">Technology used</Card.Header>
        <Card.Body>
          <Card.Title> - NodeJS, ExpressJS</Card.Title>
          <Card.Title> - MongoDB</Card.Title>
          <Card.Title> - ReactJS</Card.Title>
          <Card.Title> - React router dom</Card.Title>
          <Card.Title> - React bootstrap</Card.Title>
          <Card.Title> - React toastify</Card.Title>
          <Card.Title> - Axios</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default About;
