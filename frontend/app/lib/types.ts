interface User {
    id: string;
}

interface Group {
    id: string;
    name: string;
    users: User[];
}

interface Note {
    id: string;
    title: string;
    content: string;
}

interface Comment {
    id: string;
    content: string;
    user: User;
}

interface NoteVersion {
    id: string;
}