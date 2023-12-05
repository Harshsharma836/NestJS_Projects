// import {Entity, Column, JoinColumn, ManyToOne} from 'typeorm'
// // import {BaseEntity} from '~core/database/base.entity'
// // import {NotificationTypeEnum} from '~modules/notification/enum/notification-type.enum'
// // import {UserEntity} from '~modules/user/entity/user.entity'
// // import {bigintTransformer} from '~core/database/transformer/bigint.transformer'
// // import {NftEntity} from '~modules/nft/entity/nft.entity'

// @Entity('Notification')
// export class NotificationEntity extends BaseEntity {
  

//   @Column({type: 'bigint', transformer: bigintTransformer})
//   byUserId: BigInt

//   @Column({type: 'bigint', transformer: bigintTransformer})
//   toUserId: BigInt

//   @Column({default: false})
//   isRead: boolean

//   @Column({type: 'bigint', transformer: bigintTransformer, nullable: true})
//   nftId: BigInt

//   @Column({nullable: true})
//   txHash: string

//   @Column({type: 'json', default: {}})
//   data: Record<string, string | number | boolean>

//   @ManyToOne(() => UserEntity, (user) => user.notifications)
//   @JoinColumn({name: 'byUserId'})
//   byUser: UserEntity

//   @ManyToOne(() => NftEntity, (nft) => nft.ofNotifications)
//   @JoinColumn({name: 'nftId'})
//   nft: NftEntity
// }
