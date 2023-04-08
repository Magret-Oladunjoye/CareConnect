CREATE TABLE Doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255) NOT NULL,
    about TEXT,
    hospital VARCHAR(255),
    location VARCHAR(255),
    special_interests TEXT,
    treatments_offered TEXT,
    work_experience TEXT,
    education TEXT
);



