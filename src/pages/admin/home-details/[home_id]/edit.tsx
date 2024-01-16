import { useUpdateHome } from '@/api/mutations/update-home'
import { useGetSingleList } from '@/api/query/get-single-list'
import SmallLoader from '@/components/molecules/loader/loader'
import Layout from '@/components/organisms/layout'
import { AdminRoutes } from '@/constants/routes'
import { validateSchema } from '@/validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { SlCloudUpload } from 'react-icons/sl'
import { toast } from 'react-toastify'

const EditHome = () => {
    const router = useRouter();
    const { home_id } = useRouter().query

    const methods = useForm({ resolver: yupResolver(validateSchema) });
    const { mutate: getUpdateHome, isLoading: isUpdatingLoading } =
        useUpdateHome();
    console.log('home_id', home_id);

    const { isLoading: gettingHomeData, data: homeResponse, refetch } = useGetSingleList(home_id as string)
    console.log('gettingHomeData>>>>>>>>>>>', gettingHomeData);

    const handleBack = () => {
        router.back()
    }
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = methods;

    useEffect(() => {
        refetch()
    }, [home_id])

    useEffect(() => {
        setValue("name", homeResponse?.buyHome?.name);
        setValue("description", homeResponse?.buyHome?.description);
        setValue("price", homeResponse?.buyHome?.price);
        setValue("bedroom", homeResponse?.buyHome?.bedroom);
        setValue("bathrooms", homeResponse?.buyHome?.bathrooms);
        setValue("constructionYear", homeResponse?.buyHome?.constructionYear);
        setValue("size", homeResponse?.buyHome?.size);
        setValue("floor", homeResponse?.buyHome?.floor);
        setValue("renovation", homeResponse?.buyHome?.renovation);
        setValue("garage", homeResponse?.buyHome?.garage);
        setValue("furnishing", homeResponse?.buyHome?.furnishing);
        setValue("images", homeResponse?.buyHome?.media);
        setValue("address", homeResponse?.buyHome?.address);
    }, [homeResponse])

    console.log('homeResponse', homeResponse);

    console.log('errors', errors);

    const handleUpdate = async (home: any) => {
        console.log('home', home);

        try {
            getUpdateHome(
                {
                    _id: home_id,
                    ...home,
                },
                {
                    onSuccess: () => {
                        router.push(AdminRoutes?.DASHBOARD?.absolutePath)
                        reset();
                    },
                    onError: (error) => {
                        console.error("Error from getUpdateHome:", error);
                        toast.error("Update failed. Please check the home details.");
                    },
                }
            );

        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Update failed. Please try again.");
        }
    };

    return (
        <Layout>
            <section>
                <div className='p-5 lg:p-0'>
                    <div className="mb-10">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-admin-color">
                            Edit Home
                        </h1>
                    </div>
                    <div className="flex flex-col lg:items-center justify-center">
                        <div className="text-right w-full"></div>
                        <div>
                            <FormProvider {...methods}>
                                <form
                                    onSubmit={handleSubmit(handleUpdate)}
                                    className="grid lg:grid-cols-2 grid-cols lg:gap-20 gap-5 "
                                >
                                    <div>
                                        <div className="grid lg:grid-cols-3 grid-cols-2 gap-3">
                                            <div className="mb-4">
                                                <label className="block text-admin-color font-medium mb-1">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color2 text-sm"
                                                    placeholder="Enter Property Name"
                                                    {...register("name", { required: true })}
                                                />
                                                {errors?.name && (
                                                    <p className="text-[red] text-xs mt-1">
                                                        {errors?.name?.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-admin-color font-medium mb-1">
                                                    Price
                                                </label>
                                                <input
                                                    type="number"
                                                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color2 text-sm"
                                                    placeholder="Enter Property Price"
                                                    {...register("price", { required: true })}
                                                />
                                                {errors?.price && (
                                                    <p className="text-[red] text-xs mt-1">
                                                        {errors?.price?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-admin-color font-medium mb-1">
                                                    Bedroom
                                                </label>
                                                <input
                                                    type="number"
                                                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color2 text-sm"
                                                    placeholder="Enter number of bedroom"
                                                    {...register("bedroom", { required: true })}
                                                />
                                                {errors?.bedroom && (
                                                    <p className="text-[red] text-xs mt-1">
                                                        {errors?.bedroom?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-admin-color font-medium mb-1">
                                                    Bathrooms
                                                </label>
                                                <input
                                                    type="number"
                                                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color2 text-sm"
                                                    placeholder="Enter number of bathrooms"
                                                    {...register("bathrooms", { required: true })}
                                                />
                                                {errors?.bathrooms && (
                                                    <p className="text-[red] text-xs mt-1">
                                                        {errors?.bathrooms?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-admin-color font-medium mb-1">
                                                    Size <small>(ft<sup>2</sup>)</small>
                                                </label>
                                                <input
                                                    type="number"
                                                className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color2 text-sm"
                                                    placeholder="Enter number of size"
                                                    {...register("size", { required: true })}
                                                />
                                                {errors?.size && (
                                                    <p className="text-[red] text-xs mt-1">
                                                        {errors?.size?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-admin-color font-medium mb-1">
                                                    Floor
                                                </label>
                                                <input
                                                    type="number"
                                                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color2 text-sm"
                                                    placeholder="Enter number of floor"
                                                    {...register("floor", { required: true })}
                                                />
                                                {errors?.floor && (
                                                    <p className="text-[red] text-xs mt-1">
                                                        {errors?.floor?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-admin-color font-medium mb-1">
                                                    Garage
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color2 text-sm"
                                                    placeholder="Yes or No"
                                                    {...register("garage", { required: true })}
                                                />
                                                {errors?.garage && (
                                                    <p className="text-[red] text-xs mt-1">
                                                        {errors?.garage?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-admin-color font-medium mb-1">
                                                    Renovation
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color2 text-sm"
                                                    placeholder="Yes or No"
                                                    {...register("renovation", { required: true })}
                                                />
                                                {errors?.renovation && (
                                                    <p className="text-[red] text-xs mt-1">
                                                        {errors?.renovation?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-admin-color font-medium mb-1">
                                                    Furnishing
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color2 text-sm"
                                                    placeholder="Yes or No"
                                                    {...register("furnishing", { required: true })}
                                                />
                                                {errors?.furnishing && (
                                                    <p className="text-[red] text-xs mt-1">
                                                        {errors?.furnishing?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-admin-color font-medium mb-1">
                                                    Construction Year
                                                </label>
                                                <input
                                                    type="date"
                                                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color2 text-sm"
                                                    placeholder="Enter construction Year"
                                                    {...register("constructionYear", {
                                                        required: true,
                                                    })}
                                                />
                                                {errors?.constructionYear && (
                                                    <p className="text-[red] text-xs mt-1">
                                                        {errors?.constructionYear?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-admin-color font-medium mb-1">
                                                    Address
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color2 text-sm"
                                                    placeholder="Enter Property Address"
                                                    {...register("address", { required: true })}
                                                />
                                                {errors?.address && (
                                                    <p className="text-[red] text-xs mt-1">
                                                        {errors?.address?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-admin-color font-medium mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-primary bg-[#282828] border-[#353535] text-admin-color2 text-sm h-[80px]"
                                                placeholder="Enter Property Description"
                                                {...register("description", { required: true })}
                                            ></textarea>
                                            {errors?.description && (
                                                <p className="text-[red] text-xs mt-1">
                                                    {errors?.description?.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-admin-color font-medium mb-1">
                                            Upload Images
                                        </label>
                                        <div className="flex h-80 items-center w-auto bg-[#282828]  border-[1.5px] border-admin-color border-dashed rounded-[16px]">
                                            <div className="box__input w-full">
                                                <label className="text-center cursor-pointer">
                                                    <p className="text-center mb-5 flex items-center justify-center">
                                                        <SlCloudUpload
                                                            size={80}
                                                            className="text-admin-color"
                                                        />
                                                    </p>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="/*"
                                                        multiple
                                                        {...register("images")}
                                                    />
                                                    <div className="text-center">
                                                        <strong className="font-figtree text-base leading-[28.8px] font-normal text-admin-color">
                                                            Drag and drop files here <br />
                                                        </strong>
                                                        <span className="font-figtree text-base leading-[28.8px] font-medium text-admin-color">
                                                            Browse Files
                                                        </span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex items-center lg:justify-end  justify-start">
                                            <div className="flex justify-end gap-5 mt-6">
                                                <button
                                                    type="button"
                                                    onClick={handleBack}
                                                    className="text-admin-color2 text-base font-medium flex gap-1 items-center bg-[#313131] py-3 px-5 rounded focus:outline-none focus:shadow-outline"
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="text-admin-color2 text-base font-medium flex gap-1 items-center bg-[#313131] py-3 px-5 rounded focus:outline-none focus:shadow-outline"
                                                >
                                                    {isUpdatingLoading ? (
                                                        <SmallLoader />
                                                    ) : (
                                                        "Update"
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </FormProvider>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default EditHome