import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import  Users  from "./Users"

@Entity("messages")
export default class Messages {

    @PrimaryColumn()
    id: string

    @Column()
    admin_id: string

    @Column()
    text: string

    @JoinColumn({ name: "user_id"})
    @ManyToOne(() => Users)
    user: Users

    @Column()
    user_id: string

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }

    }

}