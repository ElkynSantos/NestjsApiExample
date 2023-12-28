import * as mongoose from 'mongoose';

export const Flight = new mongoose.Schema({
    name:{type:String,required:true},

    pilot:{type:String,required:true},
    airplane:{type:String,required:true},
    destinationCity: {type:String,required:true},
    flightDate: {type:Date,required:true},
    passangers: [{type:mongoose.Schema.Types.ObjectId,ref:'passengers'}]


},
{timestamps:true}
)

Flight.index({email:1},{unique:true});