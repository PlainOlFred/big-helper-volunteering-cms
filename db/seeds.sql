-- Charity

INSERT INTO `big_helper_db`.`charity` (name, email) 
    VALUES 
    ("Helping Hands", "hhCharity@examlpe.com"),
    ("One For One", "ofoCharity@examlpe.com"),
    ("Yos and Us", "yauCharity@examlpe.com");

-- Team

INSERT INTO `big_helper_db`.`team` (name)
    VALUES
    ('Red Team'),
    ('Blue Team');


-- Volunteer

INSERT INTO `big_helper_db`.`volunteer` (first_name, last_name, email, location_role, team_team_id) 
    VALUES 
    ("Bill", "Holmes", "bhVolunteer@example.com", "ADMIN", 1  ),
    ("Tom", "Holmes", "thVolunteer@example.com","SUPER", 1  ),
    ("Sally", "Edwards", "sehVolunteer@example.com","SUPER", 1 ),
    ("Rick", "Jones", "rjVolunteer@example.com","TEAM_MEMBER", 1 ),
    ("Sarah", "Jones", "sjVolunteer@example.com","TEAM_MEMBER", 1 ),
    ("Tim", "Johnson", "tjVolunteer@example.com","TEAM_MEMBER", 2 ),
    ("Ricky", "Mack", "rmVolunteer@example.com","TEAM_MEMBER", 2 ),
    ("Mary", "Mack", "mmVolunteer@example.com","TEAM_MEMBER", 2 );


INSERT INTO `big_helper_db`.`project` (name, date_started, date_target, date_completed, description, charity_charity_id, team_team_id)
    VALUES
    ("Project 1", "2020-1-1", null, null, " description p1", 1, 1),
    ("Project 2", "2020-1-1", null, null, " description p2", 1, 1);


INSERT INTO `big_helper_db`.`task` (project_id, volunteer_id, status, description)
    VALUES
    (1,2, "ASSIGNED", "description"),
    (1,2, "ASSIGNED", "description"),
    (2,4, "ASSIGNED", "description"),
    (2,4, "ASSIGNED", "description"),
    (2,4, "ASSIGNED", "description"),
    (2,4, "ASSIGNED", "description");




  
