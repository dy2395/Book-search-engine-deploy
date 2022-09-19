import React, { useState } from 'react';
import { Row, Container, Col, Button, Card,CardImg,CardBody,CardTitle,CardText} from 'reactstrap';
import Form from 'react-bootstrap/Form'
import { searchGoogle } from '../utils/API';

const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogle(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        link: book.volumeInfo.infoLink,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Row fluid="ture" className='text-light bg-dark'>
        <Container>
          <h1>Search for Books</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Container>
      </Row>

      
      <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row fluid="ture">
          {searchedBooks.map((book) => {
            return (
              <Col md={4}>
              <Card key={book.bookId} border='dark'>
                {book.image ? (
                  <CardImg src={book.image} alt={`The cover for ${book.title}`} top />
                ) : null}
                <CardBody>
                  <CardTitle>{book.title}</CardTitle>
                  <p className='small'>Authors: {book.authors}</p>
                  <CardText>{book.description}</CardText>
                </CardBody>
              </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  );
};

export default SearchBooks;