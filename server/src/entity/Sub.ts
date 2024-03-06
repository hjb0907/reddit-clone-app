import { Column, Entity, Index, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import BaseEntity from './Entity'
import {User} from './User'
import Post from './Post'
import { Expose } from 'class-transformer'; 

@Entity('subs')
export default class Sub extends BaseEntity {

    @Index()
    @Column({ unique: true })
    name: string;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    imageUrn: string;

    @Column({ nullable: true })
    bannerUrn: string;

    @Column()
    username: string;

    @ManyToOne(()=>User)
    @JoinColumn({ name: "username", referencedColumName:"username"})
    user: User;

    @OneToMany(() => Post, (post) => post.sub)
    posts: Post[]

    @Expose() 
    get imageUrl(): string {
        return this.imageUrn ? `${process.env.APP_URL}/images/${this.imageUrn}` :
            "https://ko.gravatar.com/avatar?d=mp&f=y";
    }

    @Expose() 
    get bannerUrl(): string | undefined {
        return this.bannerUrn ? `${process.env.APP_URL}/images/${this.bannerUrn}` :
            undefined;
    }

}
