export interface GHRepo {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    avatar_url: string;
    gravatar_id: string;
    url: string;
}

export enum GHEntity {
    ISSUES = 'issues',
    REPOSITORIES = 'repositories',
    USERS = 'users'
}