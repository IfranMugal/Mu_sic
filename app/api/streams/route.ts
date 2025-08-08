import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Innertube } from 'youtubei.js';

const youtube = await Innertube.create();
import getVideoId from 'get-video-id';

const YT_REGEX = new RegExp("^(?:https?:\\/\\/)?(?:www\\.)?(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/|youtube\\.com\\/embed\\/)([\\w-]{11})(?:[?&].*)?$");
  

const CreateStreamSchema = z.object({
    creatorId : z.string(),
    url : z.string()
})

export async function POST(req:NextRequest,res:NextResponse){
    try{
        const data = CreateStreamSchema.parse(await req.json());
        const is_yt = YT_REGEX.test(data.url);
        if(!is_yt){
            return NextResponse.json({
                message : "wrong url format"
            },{
                status : 411
            })
        }
        const { id } = getVideoId(data.url);
        const extractedId = id ?? ""

        
        const videoDetails = await youtube.getInfo(extractedId)
        const videoTitle = videoDetails.basic_info.title
        const plainThumbnails = videoDetails.basic_info.thumbnail?.map(t => ({
            url : t.url,
        })) || []
        let bigImg = ""
        let smallImg = ""
        if(plainThumbnails.length > 0){
            bigImg = plainThumbnails[0].url
            smallImg = bigImg
        }
        if(plainThumbnails.length > 1){
            smallImg = plainThumbnails[1].url
        }

        console.log({
            url: data.url,
            extractedId,
            type: "Youtube",
            userId: data.creatorId,
            title: videoTitle,
            bigImg,
            smallImg
          })

//          url         String
//          title       String?
//          bigImg      String?
//          smallImg    String?
//          extractedId String
//          type        StreamType
//          userId      String
          
        await prismaClient.stream.create({
            data : {
                url : data.url,
                title : videoTitle || "",
                bigImg,
                smallImg,
                extractedId,
                type : "Youtube",
                userId  : data.creatorId,
            }
        })
        return NextResponse.json({
            message : "stream created successfully"
        },{
            status : 201
        })
    }catch(e){
        return NextResponse.json({
            error : e,
            message : "Error while creating stream"
        })
    }
}

export async function GET(req:NextRequest){
    const creatorId = req.nextUrl.searchParams.get("creatorId")
    const streams = await prismaClient.stream.findMany({
        where : {
            userId : creatorId ?? ""
        }
    })
    return NextResponse.json({
        streams : streams
    })
}