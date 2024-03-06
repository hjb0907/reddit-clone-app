import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// 추상적 클래스 Entity를 정의, 이 클래스가 BaseEntity 클래스를 상속한다
export default abstract class Entity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updatedAT: Date;
}