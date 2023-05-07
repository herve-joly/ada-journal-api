Models:
- User:
    Id
    Username
    Password
- Journal
    Id
    UserId
    DateCreated
    DateModified
    Title
-Text
    Id
    JournalId
    UserId
    DateCreated
    DateModified
    Text

User have many journal
Journal have one User
Journal have many Text
Text have one Journal