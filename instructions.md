# TP API Autonomie - Hyperplanning

## Course entity

```
name: string;
date: string;
ranges: string; (ou un enum pour ceux qui sont à l'aise avec ça)
teacher: User;
students: User[];
courseId: string (uuid si possible pour le type typeorm, id autogénéré)
room: Room
subject: Subject
notes: Note[]
```

## User entity

```
firstName: string;
lastName: string;
userId: string  (uuid si possible pour le type typeorm, id autogénéré)
birthDate: Date;
password: string;
email: string;
role: RoleEnum
gradeLevel: GradeLevelEnum
```

## Room

```
roomId: string;
name: string;
floor: number;
```

## Subject

```
name: string;
subjectId: string;
branch: BranchEnum;
```

## Note

```
value: string;
user: User;
teacher: User;
noteId: string;
course: Course;
```

## Enums

rappel: pour créer un enum

```ts
export enum BranchEnum {
  INGESUP = 'INGESUP',
  MARKETING = 'MARKETING',
  GRAPHIC = 'GRAPHIC',
  3D = '3D',
}
```

GradeLevelEnum : 'B1' | 'B2' | 'B3' | 'M1' | 'M2'
RoleEnum : 'Teacher' | 'Student'

## Étapes

1. Créer l'entité `Course`
2. Créer l'entité `Room`
3. Créer l'entité `Subject`
4. Créer l'entité `User`
5. Créer l'entité `Note`
6. Créer un CRUD complet pour le `Course`
7. Créer un CRUD complet pour le `Room`
8. Créer un CRUD complet pour le `Subject`
9. Créer un CRUD complet pour le `Note` (sauf le delete et l'update)
10. Créer un CRUD complet pour le `User`

Attention: Deux cours ne peuvent pas avoir lieu en même temps dans la même salle
Attention: 1 cours ne peut avoir dans `teacher` un user avec le rôle `student`
Attention: 1 cours ne peut avoir dans `students` un user avec le rôle `teacher`
Attention: Seul des étudiants de la bonne filière peuvent assister à un cours
Attention: Pour qu'une note soit valide, l'élève et le professeur doivent être présent dans le cours

Temps: 4h
