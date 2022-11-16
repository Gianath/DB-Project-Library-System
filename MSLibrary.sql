CREATE DATABASE [MSLibrary]
DROP DATABASE MSLibrary
GO
USE MSLibrary
SELECT StudentName
FROM Student
WHERE StudentName = ANY
(
	SELECT StudentName
	FROM Student s JOIN Borrow b ON s.StudentID=b.StudentID
	WHERE ReturnDate is null
)
CREATE TABLE Student(
	StudentID CHAR(10) PRIMARY KEY,
	StudentName VARCHAR(255) NOT NULL,
	StudentPWD VARCHAR(255) NOT NULL,
	StudentEmail VARCHAR(255) NOT NULL UNIQUE
)
GO
CREATE TABLE Librarian(
	LibID CHAR(5) PRIMARY KEY,
	LibName VARCHAR(255) NOT NULL,
	LibPWD VARCHAR(255) NOT NULL
)
GO
CREATE TABLE Book (
    BookID CHAR(13) PRIMARY KEY CHECK(BookID LIKE 'BN[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
    BookTitle VARCHAR(255) NOT NULL,
    BookAuthor VARCHAR(255) ,
    BookPublisher VARCHAR(255),
    BookYear DATE,
    BookGenre VARCHAR(255),
    BookAmount INT NOT NULL
)
GO
CREATE TABLE Borrow(
	BorrowID CHAR(7) PRIMARY KEY,
	LibID CHAR(5) REFERENCES Librarian(LibID),
	StudentID CHAR(10) REFERENCES Student(StudentID),
	BorrowDate DATE NOT NULL,
	ReturnDate DATE
)
GO
CREATE TABLE BorrowDetail(
	BookID CHAR(13) REFERENCES Book(BookID) ON DELETE CASCADE,
	BorrowID CHAR(7) REFERENCES Borrow(BorrowID)
	PRIMARY KEY(BookID,BorrowID)
)

GO
SELECT * FROM Librarian
INSERT INTO Student VALUES('2440007062', 'Gian','heeder','binus@gmail.com')

SELECT *
FROM Book b JOIN BorrowDetail bd ON b.BookID = bd.BookID 
JOIN Borrow br ON br.BorrowID = bd.BorrowID JOIN Student s ON br.StudentID = s.StudentID

SELECT * FROM Book WHERE BookAmount > 0 AND BookTitle LIKE '%%'

SELECT * FROM Borrow WHERE ReturnDate is null

SELECT BookGenre, SUM(BookAmount)
FROM Book
GROUP BY BookGenre
Having SUM(BookAmount) > 1


insert into Book values
	('BN12365478919', 'Henry Poutter', 'J.K. Soaring', null, null, 'Novel', '5'), 
	('BN65478932146', 'The Hunger James', 'Xtrauss', null, null, 'Novel', '3'), 
	('BN95145675382', 'Detergent', 'Flowerman', null, null, 'Novel', '2')

insert into Librarian values
	('L1234', 'Gian Athevan', 'chingchenghonji'), 
	('L4567', 'Jethro Lim', 'xuehuapiaopiao'), 
	('L7890', 'Amelia Lila', 'bingchilling')

insert into Student values
	('2345617894', 'Jethro Amelia', 'iloveicecream', 'j_amelia@binus.ac.id'), 
	('2278961234', 'Lila Athevan', 'superidolsmile', 'lilaath@binus.ac.id'), 
	('2412367896', 'Gian Lim', 'poohthewinnie', 'gianL@binus.ac.id')

go
insert into Borrow values
	('LB32109', 'L7890', '2345617894', '2021-10-15', '2021-10-18'), 
	('LB45689', 'L4567', '2412367896', '2021-11-10', '2021-11-12'), 
	('LB76543', 'L1234', '2278961234', '2021-12-3', null)

go
insert into BorrowDetail values
	('BN12365478919', 'LB32109'), 
	('BN65478932146', 'LB45689'), 
	('BN95145675382', 'LB76543')


